import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import auth from '../utils/Auth';

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] =React.useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
    
    
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [deleteCard, setDeleteCard] = React.useState({});

    const [renderLoading, setRenderLoading] = React.useState(false);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function onCardConfirmDelete(card) {
        setDeleteCard(card);
        setConfirmationPopupOpen(true);
        
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setSelectedCard({});
        setConfirmationPopupOpen(false);
    }

    function handleRegistration(password, email) {
        auth.register(password, email)
        .then((response) => {
            try {
              if (response.status === 200){
                return response.json();
              }
            } catch(e){
              return (e)
            }
          })
          .then((res) => {
            return res;
          })
          .catch((err) => console.log(err));        
    }

    function handleUpdateUser(user) {
        setRenderLoading(true);
        api.editProfileInfo(user.name, user.about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>{
                setRenderLoading(false);
            })
    }

    function handleUpdateAvatar(link) {
        setRenderLoading(true);
        api.addAvatar(link)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>{
                setRenderLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }) 
            .catch((err) => {
                console.log(err)
            })
    }

    function handleCardDelete(e) {
        e.preventDefault();
        setRenderLoading(true);
        api.deleteCard(deleteCard._id)
            .then(() => {
            setCards((cards) => cards.filter((item) => item._id !== deleteCard._id));
            setConfirmationPopupOpen(false);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>{
                setRenderLoading(false);
            });
    }

    function handleAddPlaceSubmit(card) {
        setRenderLoading(true);
        api.addCard(card.name, card.link)
            .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>{
                setRenderLoading(false);
            });
    }

    React.useEffect(() => {
        Promise.all([
            api.getProfileInfo(),
            api.getInitialCards()
        ])                    
            .then((res) => {
                const [userInfo, cards] = res
                setCurrentUser(userInfo);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err)
            });
          }, []);

return (
    <CurrentUserContext.Provider value={currentUser}>  
        <div className="page__content">
        <Header />
        <Switch>
            <Route path="/sign-up">
                <Register 
                    onRegistration={handleRegistration}
                />
            </Route>
            {/* <Route path="/sign-in">
                <Login />
            </Route> */}
            <ProtectedRoute
                exact path="/"
                component={Main}
                cards={cards}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onEditAvatar = {handleEditAvatarClick}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                onCardDelete = {onCardConfirmDelete}
            />
        </Switch>
        <Footer />
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            renderLoading={renderLoading}/>
        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            renderLoading={renderLoading}/>
        <EditAvatarPopup  
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            renderLoading={renderLoading}/>
        <ImagePopup 
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups} 
            card={selectedCard}
        />
        <PopupWithConfirmation
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}            
            renderLoading={renderLoading}
            onSubmit={handleCardDelete}
        />    
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
