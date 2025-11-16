# Automation Manager

This project is about a rural automation management system, that would keep track of automations in farm contexts.

The real life, automated systems will likely include a client composed of embedded systems (microcontrollers, etc), that will send sensor data to the server, and expose available actions it can execute (open doors, turn on motors, etc).

The Automation Manager server will keep track of all this data and allow frontend clients (web, mobile) to visualize and send requests to the microcontroller, as 
- show state of system (humidity levels, doors states, etc)
- trigger available actions 
  - open door
  - turn on AC
  - start/stop motor
  etc

