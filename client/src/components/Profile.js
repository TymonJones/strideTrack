import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data);
        setNewBio(data.bio);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await fetch('/api/goals');
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchProfile();
    fetchGoals();
  }, []);

  const handleSaveBio = async () => {
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });
      setProfile((prevProfile) => ({ ...prevProfile, bio: newBio }));
      setEditingBio(false);
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.username}</h1>
      {editingBio ? (
        <div>
          <input
            type="text"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <button onClick={handleSaveBio}>Save</button>
        </div>
      ) : (
        <div>
          <p>{profile.bio}</p>
          <button onClick={() => setEditingBio(true)}>Edit Bio</button>
        </div>
      )}
      <h2>Your Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>{goal.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
