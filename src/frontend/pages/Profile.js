
import { useContext,useState } from "react"

import { useAuth } from "../../frontend/context/authContext"
import { Follow } from "../components/follow";
import { Sidebar } from "../components/sidebar";
import '../styles/profile.css'


export const Profile = () => {
  const getUser = JSON.parse(localStorage.getItem('user'));
  const [editingBio, setEditingBio] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(false);
  const [bio, setBio] = useState(getUser.bio || '');
  const [portfolioUrl, setPortfolioUrl] = useState(getUser.portfolioUrl || '');
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const avatarOptions = [
  
   'https://i.pinimg.com/originals/8a/55/99/8a5599792c0d7b0a02377b97fafe76a9.jpg',
    'https://th.bing.com/th/id/R.5f312f510e6c40e07aa126c04337d931?rik=jUl%2fUKyjfs47Ww&riu=http%3a%2f%2ftwinwingames.com%2fwp-content%2fuploads%2f2016%2f02%2fOksana_I_02.png&ehk=szl9AqgCRCF83Eg8kBluz85SI1kHgi4b35OqSVS%2bs%2bU%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.4hB6oEaZRbUDxko2zVd_lgHaHa?pid=ImgDet&w=500&h=500&rs=1',
    'https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg'
  ];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleBioSave = () => {
    // Save the user's bio to the backend and update the local state
    // You would implement this function according to your backend logic
    console.log('Saving bio:', bio);
    setEditingBio(false);
  };

  const handlePortfolioSave = () => {
    // Save the user's portfolio URL to the backend and update the local state
    // You would implement this function according to your backend logic
    console.log('Saving portfolio URL:', portfolioUrl);
    setEditingPortfolio(false);
  };

  return (
    <div className="container">
        <Sidebar />
      {/* Display user's profile information */}
      <div className="user-profile">
        <img src={selectedAvatar || "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg" }alt="Profile Avatar" />
        <h1>{getUser.firstName}</h1>
        <h2>{getUser.username}</h2>
        <h2>{getUser.email}</h2>
      </div>
      {editingAvatar ? (
        <div className="avatar-options">
          {avatarOptions.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar Option ${index}`}
              onClick={() => handleAvatarSelect(avatar)}
            />
          ))}
          <button onClick={() => setEditingAvatar(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-section">
          <button onClick={() => setEditingAvatar(true)}>Edit Profile Picture</button>
        </div>
      )}

      {/* Edit Bio section */}
      {editingBio ? (
        <div className="edit-section">
          <textarea value={bio} onChange={e => setBio(e.target.value)} />
          <button onClick={handleBioSave}>Save</button>
        </div>
      ) : (
        <div className="profile-section">
          <p>{bio}</p>
          <button onClick={() => setEditingBio(true)}>Edit Bio</button>
        </div>
      )}

      {/* Edit Portfolio URL section */}
      {editingPortfolio ? (
        <div className="edit-section">
          <input type="text" value={portfolioUrl} onChange={e => setPortfolioUrl(e.target.value)} />
          <button onClick={handlePortfolioSave}>Save</button>
        </div>
      ) : (
        <div className="profile-section">
          <p>{portfolioUrl}</p>
          <button onClick={() => setEditingPortfolio(true)}>Edit Portfolio URL</button>
        </div>
      )}
    </div>
  );
};
