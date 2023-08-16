import ListItem from './ListItem'
import '../../css/MenuIcon.css'

export default function MenuList(){
    return(
    <ul className="dropdown">
        <ListItem itemName='Change Background'/>
        <ListItem itemName='Settings'/>
        <ListItem itemName='Dark Mode'/>
    </ul>
    );
}