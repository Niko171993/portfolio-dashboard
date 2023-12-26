import './menu.scss';
import { Link } from 'react-router-dom';
import { menu } from '../../data';
const Menu = () => {
  return (
    <div>
      {menu.map((item) => {
        return (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => {
              return (
                <Link to={listItem.url} className="listItem" key={listItem.id}>
                  <img src={`${listItem.icon}`} alt="home" />
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
