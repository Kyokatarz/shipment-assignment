### Solution to the shipment problem

Thought process:

- I immediately spitted the problem into smaller ones:
  - Creating events when the vessel is docked.
  - Creating events when the vessel is travelling to another port.
- When reading the problem, I realized that when docked, the vessel is always in either of the three state: Loading, Discharging or Idle-ing.
- So I filter all of the discharging and loading task which related to the current port call.
- Then for each task, I push an event to the events array (which later be rendered in to table row).
- Also, I realized if there is leftover time until the vessel leaves the port, tt is going to be idle. So I push an "Idle" event to the events array if there is time left.
- By that, I've finished handling the case where the shipment is docked

- Next up, is to handle the case where the vessel is travelling to another port.
- When the ship leaves a port, it will always end up somewhere else. That somewhere else has a time of arrival, which is the soonest time after leaving the previous port.
- The difference of those times are the travelling time.
- To determine whether the vessel is empty or not. I used an array to keep track of the itemIds that are currently in the vessel.
- Add color red for the Idle event (because idle-ing is bad, I assumed?)

A few things to take notes:

- The algorithm to determine whether the vessel is empty or not needs changing if the vessel only discharges a partial of an item. For example, if the vessel carries 2kgs of bananas, and visits 2 different ports for 1 kg each, then the current algorithm is not correct.
- Could display an empty page indicating that there is no callports/orders on the vessel.
- UI enhancement

TODO:
[ ] Write unit tests
[X] Stylings through tailwind
[ ] Dynamic Routings for different shipments?
