import { topDealUsers } from '../../data';
import './topBox.scss';
const topBox = () => {
  return (
    <div>
      <h1>Top Deals</h1>
      <div className="list">
        {topDealUsers.map((user) => {
          return (
            <div className="listItem" key={user.id}>
              <div className="user">
                <img src={user.img} alt={user.username} />
                <div className="userTexts">
                  <span className="username">{user.username}</span>
                  <span className="email">{user.email}</span>
                </div>
              </div>
              <span className="amount">${user.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default topBox;
