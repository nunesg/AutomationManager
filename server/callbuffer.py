from queue import Queue, Empty, Full
from typing import Optional, List
from pydantic import BaseModel

class CallItem(BaseModel):
    """Represents a structured item to be queued in the CallBuffer."""
    name: str
    systemId: int
    moduleId: int


class CallBuffer:
    """Manages a FIFO (First-In, First-Out) buffer queue of CallItem objects.
    
    This class is thread-safe and provides methods for adding, retrieving,
    and managing buffered items.
    """

    def __init__(self, maxsize: int = 0) -> None:
        """Initialize the call buffer.

        :param maxsize: Maximum number of items allowed in the buffer.
                        Defaults to 0 (infinite size).
        """
        self._queue: Queue[CallItem] = Queue(maxsize=maxsize)

    def push(self, item: CallItem, block: bool = True, timeout: Optional[float] = None) -> bool:
        """Add a CallItem to the end of the buffer.

        :param item: The CallItem payload to store.
        :param block: Whether to block if the buffer is full.
        :param timeout: Time in seconds to wait if blocking.
        :return: True if item was added successfully, False if buffer was full.
        """
        try:
            self._queue.put(item, block=block, timeout=timeout)
            return True
        except Full:
            return False

    def pop(self, block: bool = True, timeout: Optional[float] = None) -> Optional[CallItem]:
        """Retrieve and remove the oldest CallItem from the buffer.

        :param block: Whether to block if the buffer is empty.
        :param timeout: Time in seconds to wait if blocking.
        :return: The retrieved CallItem, or None if the buffer is empty.
        """
        try:
            return self._queue.get(block=block, timeout=timeout)
        except Empty:
            return None

    def popFrom(self, systemId: int, moduleId: int) -> List[CallItem]:
        """Pop all elements from the buffer matching the given systemId and 
        moduleId, preserving the order of the remaining items.

        :param systemId: The system ID to match.
        :param moduleId: The module ID to match.
        :return: A list of all matching CallItems that were removed from the buffer.
        """
        # Retrieve all items using the clear method
        all_items = self.clear()
        
        matched_items: List[CallItem] = []
        remaining_items: List[CallItem] = []

        for item in all_items:
            if item.systemId == systemId and item.moduleId == moduleId:
                matched_items.append(item)
            else:
                remaining_items.append(item)

        # Re-populate the queue using the internal push method
        for item in remaining_items:
            self.push(item)

        return matched_items

    def peek(self) -> Optional[CallItem]:
        """Inspect the next CallItem in the buffer without removing it.

        :return: The next CallItem, or None if the buffer is empty.
        """
        with self._queue.mutex:
            if not self._queue.queue:
                return None
            return self._queue.queue[0]

    def clear(self) -> List[CallItem]:
        """Empty the buffer and return all remaining items.

        :return: A list of all CallItems that were in the buffer.
        """
        drained_items: List[CallItem] = []
        while not self._queue.empty():
            try:
                drained_items.append(self._queue.get_nowait())
            except Empty:
                break
        return drained_items

    def size(self) -> int:
        """Return the current number of items in the buffer."""
        return self._queue.qsize()

    def is_empty(self) -> bool:
        """Check if the buffer is empty."""
        return self._queue.empty()

    def is_full(self) -> bool:
        """Check if the buffer is full (only applies if maxsize > 0)."""
        return self._queue.full()

    def __len__(self) -> int:
        """Support for standard python len() call."""
        return self.size()

    def __repr__(self) -> str:
        return f"<CallBuffer size={self.size()}/{self._queue.maxsize or '∞'}>"
