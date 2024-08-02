import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { globalStateSelector } from '../../slices/globalState/selector';
import { setActiveTable } from '../../slices/globalState/action';
import { useGetUsersMutation } from '../../api/dummyJson';
import { debounce } from '../../utils/debounce';
import { ReactComponent as UpArrow } from '../../svg/arrow-up.svg';
import { ReactComponent as DownArrow } from '../../svg/arrow-down.svg';
import './index.css';

const TablePlain = (props) => {
  const { activeTable } = useSelector(globalStateSelector);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [index, setIndex] = useState(0);
  const [sortBy, setSoryBy] = useState({ fieldName: null, order: null }); // order = 1 is ascending, 0 is descending

  const [getUsers, { data: users, isLoading, isError }] = useGetUsersMutation();

  useEffect(() => {
    getUsers({ limit: 10, skip: index });
  }, [index]);

  useEffect(() => {
    console.log('ssss sortBy: ', sortBy);
  }, [sortBy]);

  const incrementIndex = debounce(() => {
    setIndex(index + 10);
  }, 1000);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      incrementIndex();
    }
  };

  useEffect(() => {
    const tableContainer = document.getElementById('plain-table-container');

    tableContainer.addEventListener('scroll', handleScroll);

    return () => {
      tableContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (users) {
      // instead of this we can also use transformResponse from redux toolkit
      const transformedUsers = users.users.map((item) => {
        const user = {
          ...item,
          fullName: `${item.firstName} ${item.lastName}`,
          demography: `${item.gender === 'male' ? 'M' : 'F'}/${item.age}`,
          designation: item.company.title,
          location: `${item.address.state}, ${item.address.country}`,
        };
        return user;
      });
      const newUsers = [...state, ...transformedUsers];
      // setIndex(newUsers.length);
      setState(newUsers);
    }
  }, [users]);

  const sortByFieldName = (fieldName, order) => {
    // order: 1 for ascending, 0 for descending
    // here set the sorting field
    // if the same field is clicked again , then remove the sorting
    if (sortBy.fieldName === fieldName && sortBy.order === order) {
      setSoryBy({ fieldName: null, order: null });
      // reset to default order which is sort by id
      const sortedUsers = [...state.sort((a, b) => a.id - b.id)];
      setState(sortedUsers);
    } else {
      setSoryBy({ fieldName, order });
      if (fieldName === 'fullName') {
        let sortedUsers = [
          ...state.sort((a, b) => {
            if (a.fullName < b.fullName) return -1;
            if (a.fullName > b.fullName) return 1;
            return 0;
          }),
        ];
        if (order === 0) {
          sortedUsers.reverse();
        }
        setState(sortedUsers);
      } else {
        let sortedUsers;
        if (order === 1) {
          sortedUsers = [...state.sort((a, b) => a[fieldName] - b[fieldName])];
        } else {
          sortedUsers = [...state.sort((a, b) => b[fieldName] - a[fieldName])];
        }
        setState(sortedUsers);
      }
    }
  };

  const getClassName = (fieldName, order) => {
    if (fieldName === sortBy.fieldName && order === sortBy.order) {
      return 'active';
    }
    return '';
  };

  return (
    <div>
      TablePlain
      <div className="table-container" id="plain-table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>
                  <span>ID</span>
                  <span>
                    <UpArrow
                      onClick={() => sortByFieldName('id', 1)}
                      className={getClassName('id', 1)}
                    />
                    <DownArrow
                      onClick={() => sortByFieldName('id', 0)}
                      className={getClassName('id', 0)}
                    />
                  </span>
                </span>
              </th>
              <th>
                <span>
                  <span>Image</span>
                </span>
              </th>
              <th>
                <span>
                  <span>Full name</span>
                  <UpArrow
                    onClick={() => sortByFieldName('fullName', 1)}
                    className={getClassName('fullName', 1)}
                  />
                  <DownArrow
                    onClick={() => sortByFieldName('fullName', 0)}
                    className={getClassName('fullName', 0)}
                  />
                </span>
              </th>
              <th>
                <span>
                  <span>Demography</span>
                  <UpArrow
                    onClick={() => sortByFieldName('age', 1)}
                    className={getClassName('age', 1)}
                  />
                  <DownArrow
                    onClick={() => sortByFieldName('age', 0)}
                    className={getClassName('age', 0)}
                  />
                </span>
              </th>
              <th>
                <span>
                  <span>Designation</span>
                </span>
              </th>
              <th>
                <span>
                  <span>Location</span>
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {state.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.fullName}
                    className="user-img"
                  />
                </td>
                <td>{item.fullName}</td>
                <td>{item.demography}</td>
                <td>{item.designation}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TablePlain.propTypes = {
  visible: PropTypes.bool,
};

export default TablePlain;
