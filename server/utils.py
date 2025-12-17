def snake_to_camel(s: str) -> str:
    parts = s.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])

def camelize(obj):
    if isinstance(obj, list):
        return [camelize(i) for i in obj]
    if isinstance(obj, dict):
        return {
            snake_to_camel(k): camelize(v)
            for k, v in obj.items()
        }
    return obj