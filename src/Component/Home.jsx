import React, { useEffect, useState } from 'react'
import userServices from '../Services/userServices'
import { Button } from './Button'
import './../Styles/Home.css'
import Card from './Card'
import LoadingSpinner from './LoadingSpinner'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import {actionCreator} from './../State/index'
export default function Home() {
  const userState = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const {cardInfo, page, totalPages, users} = userState // using store data
  const {setUsersData,setCardInfo, setPage,setTotalPages} = bindActionCreators(actionCreator, dispatch); // using dispatch
  const [isRightActive, setIsRightActive] = useState(false) // to move to next right page 
  const [isLeftActive, setIsLeftActive] = useState(false) // to move to next left page 
  const [isUsersLoading, setIsUsersLoading] = useState(false) // to load loader when whole users data is laoding.
  const [isUserLoading, setIsUserLoading] = useState(false); // to load loader when single user data is loading.

  // This function is used for setting all the datas whenever we are calling apis.
  const setData = (data) => {
    setUsersData(data.data)
    setTotalPages(data.total_pages)
    setPage(data.page)
    if (data.page > 1) setIsLeftActive(true)
    else setIsLeftActive(false)
    if (data.page < data.total_pages) setIsRightActive(true)
    else setIsRightActive(false)
  }
  // To laod all user when site load for first time.
  useEffect(() => {
    async function fetchUserData() {
      setIsUsersLoading(true)
      const { data } = await userServices.getAllUsers(page)
      setIsUsersLoading(false)
      setData(data)
    }
    fetchUserData()
  }, [])

  // it is use to show the card or hide card if we click on same button twice.
  const handleClick = async (id) => {
    if(cardInfo!==null&&cardInfo.Id===id){
      setCardInfo(null);
      return;
    }
    setIsUserLoading(true)
    const {data}= await userServices.getUserById(id);
    setIsUserLoading(false)
    const avatar = data.avatar
    const name = data.first_name + ' ' + data.last_name
    const email = data.email;
    const Id = (data.id);
    setCardInfo({ avatar, name, email, Id })
  }
  // Move to left page 
  const moveLeft = async () => {
    if (page === 1) return
    setIsUsersLoading(true)
    const { data } = await userServices.getAllUsers(page - 1)
    setIsUsersLoading(false)
    setData(data)
  }
  // move to right page
  const moveRight = async () => {
    if (page === totalPages) return
    setIsUsersLoading(true)
    const { data } = await userServices.getAllUsers(page + 1)
    setIsUsersLoading(false)
    setData(data)
  }
  // console.log(users)
  return (
    <div className="home-section">
      {isUsersLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <h1>Users</h1>
          {cardInfo ? (
            isUserLoading?<LoadingSpinner></LoadingSpinner>: (<Card
              name={cardInfo.name}
              email={cardInfo.email}
              avatar={cardInfo.avatar}
              Id = {cardInfo.Id}
            />)
          ) : null}
          <div className="btn-container">
            {users.map((el, key) => {
              return (
                <div className="button_div">
                  <Button
                    buttonStyle="btn--primary"
                    key={key}
                    onClick={() => {
                      handleClick(el.id)
                    }}
                  >{`${el.id}. ${el.first_name} ${el.last_name}`}</Button>
                </div>
              )
            })}
            <div className="page-slider">
              <span
                className={isLeftActive ? 'arrow left' : 'arrow left disable'}
                onClick={moveLeft}
              >
                <i className="fa fa-angle-left"></i>
              </span>
              <p className="page-number">{`${page}/${totalPages}`}</p>
              <span
                className={
                  isRightActive ? 'arrow right' : 'arrow right disable'
                }
                onClick={moveRight}
              >
                <i className="fa fa-angle-right"></i>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
