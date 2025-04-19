import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';

const PlaceForm = ({ mode }) => {
<<<<<<< HEAD
 
    const navigate = useNavigate();
    const { id } = useParams(); // Get the place ID from the URL params
 
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        bestTimeToVisit: '',
        location: '',
        placeImage: null,
    });
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
 
    // Fetch place data when editing
    useEffect(() => {
        const fetchPlaceData = async () => {
            if (mode === 'edit' && id) {
                setLoading(true);
                try {
                    const response = await axios.get(`${baseUrl}/Place/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormData(response.data);
                } catch (error) {
                    setFormError('Error fetching place data');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPlaceData();
    }, [mode, id]);
 
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.bestTimeToVisit) newErrors.bestTimeToVisit = 'Best Time to Visit is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.placeImage) newErrors.placeImage = 'Place image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
 
        if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        setLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
    
            const payload = {
                name: formData.name,
                category: formData.category,
                bestTimeToVisit: formData.bestTimeToVisit,
                location: formData.location,
                placeImage: formData.placeImage,
            };
    
            if (mode === 'edit') {
                await axios.put(`${baseUrl}/Places/${id}`, payload, { headers });
            } else {
                await axios.post(`${baseUrl}/Places`, payload, { headers });
            }
    
            setLoading(false);
            setShowPopup(true);
        } catch (error) {
            setLoading(false);
            console.error('Error saving place:', error);
    
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setFormError('Error saving place. Please try again.');
            }
        }
    };
    
 
                const handlePopupClose = () => {
                    setShowPopup(false);
                    navigate('/viewplace');
                };
 
                return (
                    <div className="container mt-5">
                        <GuideNavbar username="DemoGuide" role="Guide" />
                        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                            <div className="card-body p-4">
                                <h2 className="card-title text-center mb-4">{mode === 'edit' ? 'Edit Place' : 'Create New Place'}</h2>
                                {formError && <p className="text-danger text-center">{formError}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="category">Category <span className="text-danger">*</span></label>
                                        <select
                                            id="category"
                                            name="category"
                                            className="form-control"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Beach">Beach</option>
                                            <option value="Mountain">Mountain</option>
                                            <option value="City">City</option>
                                            <option value="Historical">Historical</option>
                                        </select>
                                        {errors.category && <small className="text-danger">{errors.category}</small>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="bestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            id="bestTimeToVisit"
                                            name="bestTimeToVisit"
                                            className="form-control"
                                            value={formData.bestTimeToVisit}
                                            onChange={handleChange}
                                        />
                                        {errors.bestTimeToVisit && <small className="text-danger">{errors.bestTimeToVisit}</small>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="location">Location <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            className="form-control"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                        {errors.location && <small className="text-danger">{errors.location}</small>}
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="placeImage">Place Image <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                id="placeImage"
                                                name="placeImage"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.placeImage && <small className="text-danger">{errors.placeImage}</small>}
                                    </div>
                                    {formData.placeImage && (
                                        <div className="text-center mb-4">
                                            <img
                                                src={formData.placeImage}
                                                alt="Place Preview"
                                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                                        ) : (
                                            mode === 'edit' ? 'Update Place' : 'Add Place'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                        {showPopup && (
                            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content shadow-sm border-0">
                                        <div className="modal-header bg-success text-white">
                                            <h5 className="modal-title mx-auto">🎉 Success!</h5>
                                        </div>
                                        <div className="modal-body text-center">
                                            <p className="mb-0">
                                                {mode === 'edit' ? 'Place updated successfully!' : 'Place added successfully!'}
                                            </p>
                                        </div>
                                        <div className="modal-footer justify-content-center">
                                            <button type="button" className="btn btn-success px-4" onClick={handlePopupClose}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
                        }
 
                export default PlaceForm;
 
 
=======
  const navigate = useNavigate();
  const { id } = useParams(); // Get the place ID from the URL params
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    BestTimeToVisit: '',
    Location: '',
    PlaceImage: null,
  });
  const [fileName, setFileName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch place data when editing
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (mode === 'edit' && id) {
        setLoading(true);
        try {
          const response = await axios.get(`${baseUrl}/Place/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const placeData = response.data;
          setFormData({
            Name: placeData.Name,
            Category: placeData.Category,
            BestTimeToVisit: placeData.BestTimeToVisit,
            Location: placeData.Location,
            PlaceImage: placeData.PlaceImage,
          });
        } catch (error) {
          setFormError('Error fetching place data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPlaceData();
  }, [mode, id]);

  const validateForm = (mode='add') => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = 'Name is required';
    if (!formData.Category) newErrors.Category = 'Category is required';
    if (!formData.BestTimeToVisit) newErrors.BestTimeToVisit = 'Best Time to Visit is required';
    if (!formData.Location) newErrors.Location = 'Location is required';
    if (!formData.PlaceImage) newErrors.PlaceImage = 'Place image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (mode === 'edit') {
        await axios.put(`${baseUrl}/Place/${id}`, formData, { headers });
      } else {
        await axios.post(`${baseUrl}/Place`, formData, { headers });
      }
      setLoading(false);
      setShowPopup(true);
    } catch (error) {
      setLoading(false);
      console.error('Error saving place:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };
  

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/viewplace');
  };

  return (
    <div className="container mt-5">

      <GuideNavbar username="DemoGuide" role="Guide" />
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}> Back </button>
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">{mode === 'edit' ? 'Edit Place' : 'Create New Place'}</h2>
          {formError && <p className="text-danger text-center">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="Name">Name <span className="text-danger">*</span></label>
              <input
                type="text"
                id="Name"
                name="Name"
                className="form-control"
                value={formData.Name}
                onChange={handleChange}
              />
              {errors.Name && <small className="text-danger">{errors.Name}</small>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="Category">Category <span className="text-danger">*</span></label>
              <select
                id="Category"
                name="Category"
                className="form-control"
                value={formData.Category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Beach">Beach</option>
                <option value="Mountain">Mountain</option>
                <option value="City">City</option>
                <option value="Historical">Historical</option>
              </select>
              {errors.Category && <small className="text-danger">{errors.Category}</small>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="BestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
              <input
                type="text"
                id="BestTimeToVisit"
                name="BestTimeToVisit"
                className="form-control"
                value={formData.BestTimeToVisit}
                onChange={handleChange}
              />
              {errors.BestTimeToVisit && <small className="text-danger">{errors.BestTimeToVisit}</small>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="Location">Location <span className="text-danger">*</span></label>
              <input
                type="text"
                id="Location"
                name="Location"
                className="form-control"
                value={formData.Location}
                onChange={handleChange}
              />
              {errors.Location && <small className="text-danger">{errors.Location}</small>}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="PlaceImage">Place Image <span className="text-danger">*</span></label>
              <div className="input-group">
                <input
                  type="file"
                  id="PlaceImage"
                  name="PlaceImage"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              {errors.PlaceImage && <small className="text-danger">{errors.PlaceImage}</small>}
            </div>
            {formData.PlaceImage && (
              <div className="text-center mb-4">
                <img
                  src={formData.PlaceImage}
                  alt="Place Preview"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
              ) : (
                mode === 'edit' ? 'Update Place' : 'Add Place'
              )}
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-sm border-0">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title mx-auto">🎉Success!</h5>
              </div>
              <div className="modal-body text-center">
                <p className="mb-0">
                  {mode === 'edit' ? 'Place updated successfully!' : 'Place added successfully!'}
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-success px-4" onClick={handlePopupClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceForm;
>>>>>>> c55578432a6d705feedcaf3d60cf3114ecdd9237
