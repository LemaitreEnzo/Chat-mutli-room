import type { PropsNavBar } from "../../../types/props.type";
import "./NavBar.css";

function NavBar({ rooms, activeRoomId, onRoomChange }: PropsNavBar) {
  return (
    <aside>
      <h2>Les salons</h2>
      <nav>
        <ul id="roomList">
          {rooms.map((room) => (
            <li
              key={room.id}
              data-room={room.id}
              className={room.id === activeRoomId ? "active" : ""}
              onClick={() => onRoomChange(room.id)}
            >
              {room.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
