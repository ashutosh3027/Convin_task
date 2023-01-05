import React, { useEffect, useState } from 'react'
import userServices from '../Services/userServices'
import { Button } from './Button'
import './../Styles/Home.css'
import Card from './Card'
import LoadingSpinner from './LoadingSpinner'
export default function Home() {
  const [users, setUsers] = useState([])
  const [cardInfo, setCardInfo] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isRightActive, setIsRightActive] = useState(false)
  const [isLeftActive, setIsLeftActive] = useState(false)
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const setUsersData = (data) => {
    setUsers(data.data)
    setTotalPages(data.total_pages)
    setPage(data.page)
    if (data.page > 1) setIsLeftActive(true)
    else setIsLeftActive(false)
    if (data.page < data.total_pages) setIsRightActive(true)
    else setIsRightActive(false)
  }
  useEffect(() => {
    async function fetchUserData() {
      setIsUsersLoading(true)
      const { data } = await userServices.getAllUsers(page)
      setIsUsersLoading(false)
      setUsersData(data)
    }
    fetchUserData()
  }, [])
  const handleClick = async (id) => {
    setIsUserLoading(true)
    const { data } = await userServices.getUserById(id);
    setIsUserLoading(false)
    const avatar = data.avatar
    const name = data.first_name + ' ' + data.last_name
    const email = data.email
    setCardInfo({ avatar, name, email })
  }

  const moveLeft = async () => {
    if (page === 1) return
    setIsUsersLoading(true)
    const { data } = await userServices.getAllUsers(page - 1)
    setIsUsersLoading(false)
    setUsersData(data)
  }
  const moveRight = async () => {
    if (page === totalPages) return
    setIsUsersLoading(true)
    const { data } = await userServices.getAllUsers(page + 1)
    setIsUsersLoading(false)
    setUsersData(data)
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
                  >{`${el.first_name} ${el.last_name}`}</Button>
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
