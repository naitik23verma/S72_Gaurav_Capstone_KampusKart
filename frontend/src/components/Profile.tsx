import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiXCircle, FiUpload, FiAlertCircle, FiCheckCircle, FiCalendar, FiTag, FiBriefcase } from 'react-icons/fi';
import { Instagram, Linkedin, Globe, Github } from 'lucide-react';
import { API_BASE } from '../config';
import { ProfileSkeleton } from './common/SkeletonLoader';
import { Footer } from './ui/footer';

const socialLinks = [
  { href: 'https://www.instagram.com/gaurav_khandelwal_/', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { href: 'https://www.linkedin.com/in/gaurav-khandelwal-17a127358/', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  { href: 'https://gaurav-khandelwal.vercel.app/', label: 'Portfolio', icon: <Globe className="h-4 w-4" /> },
  { href: 'https://github.com/Gaurav-205', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

// Helper function to format date for display
const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'N/A';
        }
        return date.toLocaleDateString(); // Format as per local conventions
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'N/A';
    }
};

// Helper function to calculate profile completion percentage
const calculateCompletion = (profileData: any) => {
    const fields = ['name', 'email', 'phone', 'gender', 'dateOfBirth', 'major', 'program', 'yearOfStudy'];
    const filledFields = fields.filter(field => {
        const value = profileData[field];
        return value && typeof value === 'string' && value.trim() !== '';
    });
    return Math.round((filledFields.length / fields.length) * 100);
};

const Profile = () => {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    major: user?.major || '',
    yearOfStudy: user?.yearOfStudy || '',
    profilePicture: user?.profilePicture || null,
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    program: user?.program || '',
  });
  
  const [initialProfileData, setInitialProfileData] = useState(profileData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const initialData = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        major: user.major || '',
        yearOfStudy: user.yearOfStudy || '',
        profilePicture: user.profilePicture || null,
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        program: user.program || '',
      };
      setProfileData(initialData);
      setInitialProfileData(initialData);
    }
  }, [user]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !user) {
         setPageLoading(false);
         return;
      }
      setPageLoading(true);

      try {
        const response = await fetch(`${API_BASE}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.message || 'Failed to fetch profile data.');
          return;
        }
        const data = await response.json();
        if (data) {
          const fetchedData = {
             name: data.name || '',
             email: data.email || '',
             phone: data.phone || '',
             major: data.major || '',
             yearOfStudy: data.yearOfStudy || '',
             profilePicture: data.profilePicture || null,
             gender: data.gender || '',
             dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
             program: data.program || '',
          };
          setProfileData(fetchedData);
          setInitialProfileData(fetchedData);
        }
      } catch (err: any) {
        setError('An error occurred while fetching profile data.');
      } finally {
        setPageLoading(false);
      }
    };
    
    if (user && token) {
       fetchProfile();
    } else {
        setPageLoading(false);
    }

  }, [token, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setSuccessMessage(null);
  };
  
   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setSuccessMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleSave = async () => {
     if (!profileData.name.trim()) {
         setError('Name cannot be empty.');
         return;
     }

    setSaveLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('name', profileData.name.trim());
    formData.append('phone', profileData.phone.trim());
    formData.append('major', profileData.major.trim());
    formData.append('yearOfStudy', profileData.yearOfStudy.trim());
    formData.append('gender', profileData.gender.trim());
    formData.append('dateOfBirth', profileData.dateOfBirth.trim());
    formData.append('program', profileData.program.trim());

    if (selectedFile) {
        formData.append('profilePicture', selectedFile);
    }

    try {
        const response = await fetch(`${API_BASE}/api/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            const updatedData = {
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                major: data.major || '',
                yearOfStudy: data.yearOfStudy || '',
                profilePicture: data.profilePicture || null,
                gender: data.gender || '',
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                program: data.program || '',
            };
            setProfileData(updatedData);
            setInitialProfileData(updatedData);
            setSelectedFile(null);
            setPreviewUrl(null);
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);
        } else {
            setError(data.message || 'Failed to save profile.');
        }
    } catch (err: any) {
        setError('An error occurred while saving the profile.');
    } finally {
        setSaveLoading(false);
    }
  };

   const handleCancelEdit = () => {
        setProfileData({
            ...initialProfileData,
            dateOfBirth: initialProfileData.dateOfBirth ? initialProfileData.dateOfBirth.split('T')[0] : '',
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        setSuccessMessage(null);
        setIsEditing(false);
    };

  if (pageLoading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans overflow-x-hidden">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-h2 font-extrabold text-black">My Profile</h1>
          </div>

          {/* Profile Picture + Completion */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 bg-white border-2 border-gray-200 rounded-lg">
            <div className="relative w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 flex-shrink-0">
              {profileData.profilePicture?.url || previewUrl ? (
                <img
                  src={previewUrl || profileData.profilePicture?.url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-10 h-10 text-gray-300" />
              )}
              {isEditing && (
                <label
                  htmlFor="profilePicture-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                >
                  <FiUpload className="w-5 h-5 mr-1" /> Upload
                </label>
              )}
              <input
                id="profilePicture-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
            </div>
            <div className="flex-1 w-full">
              <p className="text-lg font-bold text-gray-900 mb-1">{profileData.name || 'Your Name'}</p>
              <p className="text-sm text-gray-500 mb-3">{profileData.email}</p>
              {/* Completion bar */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">Profile Completion</span>
                  <span className="text-xs font-semibold text-gray-700">{calculateCompletion(profileData)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-lg h-2">
                  <div className="bg-[#00C6A7] h-2 rounded-lg transition-all duration-300" style={{ width: `${calculateCompletion(profileData)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-medium text-sm">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3">
              <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 font-medium text-sm">{successMessage}</p>
            </div>
          )}

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 w-full">
            {isEditing ? (
              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#181818] text-white rounded-lg p-1.5"><FiUser className="w-4 h-4" /></span>
                    <h2 className="text-lg font-extrabold text-black">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiUser className="w-4 h-4"/></span>
                        <input id="name" type="text" name="name" value={profileData.name} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent placeholder-gray-400 text-sm"
                          placeholder="Your full name" required />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiMail className="w-4 h-4"/></span>
                        <input id="email" type="email" name="email" value={profileData.email}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-lg cursor-not-allowed text-sm"
                          disabled />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Cannot be changed.</p>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiPhone className="w-4 h-4"/></span>
                        <input id="phone" type="text" name="phone" value={profileData.phone} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent placeholder-gray-400 text-sm"
                          placeholder="Your phone number" />
                      </div>
                    </div>
                    {/* Gender */}
                    <div className="flex flex-col">
                      <label htmlFor="gender" className="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
                      <div className="relative">
                        <select id="gender" name="gender" value={profileData.gender} onChange={handleSelectChange}
                          className="appearance-none w-full px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent text-sm cursor-pointer">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    {/* Date of Birth */}
                    <div className="flex flex-col">
                      <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-gray-700 mb-1">Date of Birth</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiCalendar className="w-4 h-4"/></span>
                        <input id="dateOfBirth" type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#181818] text-white rounded-lg p-1.5"><FiBriefcase className="w-4 h-4" /></span>
                    <h2 className="text-lg font-extrabold text-black">Academic Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Major */}
                    <div className="flex flex-col">
                      <label htmlFor="major" className="block text-xs font-semibold text-gray-700 mb-1">Major / Department</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiTag className="w-4 h-4"/></span>
                        <input id="major" type="text" name="major" value={profileData.major} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent placeholder-gray-400 text-sm"
                          placeholder="e.g., Computer Science" />
                      </div>
                    </div>
                    {/* Program */}
                    <div className="flex flex-col">
                      <label htmlFor="program" className="block text-xs font-semibold text-gray-700 mb-1">Program</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiBriefcase className="w-4 h-4"/></span>
                        <input id="program" type="text" name="program" value={profileData.program} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent placeholder-gray-400 text-sm"
                          placeholder="e.g., Bachelor of Science" />
                      </div>
                    </div>
                    {/* Year */}
                    <div className="flex flex-col">
                      <label htmlFor="yearOfStudy" className="block text-xs font-semibold text-gray-700 mb-1">Year Interval</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiCalendar className="w-4 h-4"/></span>
                        <input id="yearOfStudy" type="text" name="yearOfStudy" value={profileData.yearOfStudy} onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent placeholder-gray-400 text-sm"
                          placeholder="e.g., 2024 - 2028" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-end gap-3 pt-2 border-t-2 border-gray-200">
                  <button type="button" onClick={handleCancelEdit}
                    className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 transition">
                    Cancel
                  </button>
                  <button type="button" onClick={handleSave} disabled={saveLoading}
                    className={`px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 ${saveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {saveLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#181818] text-white rounded-lg p-1.5"><FiUser className="w-4 h-4" /></span>
                    <h2 className="text-lg font-extrabold text-black">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Name</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiUser className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.name || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Email</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{profileData.email || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Phone</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.phone || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Gender</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiUser className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.gender || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Date of Birth</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiCalendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{formatDate(profileData.dateOfBirth)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#181818] text-white rounded-lg p-1.5"><FiBriefcase className="w-4 h-4" /></span>
                    <h2 className="text-lg font-extrabold text-black">Academic Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Major / Department</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiTag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.major || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Program</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiBriefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.program || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Year Interval</p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <FiCalendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profileData.yearOfStudy || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t-2 border-gray-200">
                  <button type="button" onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-sm hover:bg-[#00C6A7] transition-colors duration-200">
                    <FiEdit2 className="w-4 h-4" /> Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        logo={<img src="/Logo.png" alt="KampusKart Logo" className="h-7 w-7" />}
        brandName="KampusKart"
        socialLinks={socialLinks}
        mainLinks={[
          { href: '/news', label: 'News' },
          { href: '/events', label: 'Events' },
          { href: '/facilities', label: 'Facilities' },
          { href: '/campus-map', label: 'Map' },
        ]}
        legalLinks={[
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} KampusKart`,
          license: 'All rights reserved.',
        }}
      />
    </div>
  );
};

export default Profile; 