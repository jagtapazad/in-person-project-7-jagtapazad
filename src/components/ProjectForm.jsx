import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';

const emptyForm = {
  title: '',
  description: '',
  category: 'web',
  technologies: [],
  // Fixed placeholder so the new card's image is not broken
  imageUrl: 'https://placehold.co/600x400?text=New+Project'
};

// Its own file, so its hooks never sit below Projects.jsx's early returns
const ProjectForm = () => {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === '') {
      setFormError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await addProject({ ...formData, title: formData.title.trim() });
      setFormData(emptyForm);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>Add a project</h3>

      <div className="form-group">
        <label htmlFor="project-title">Title</label>
        <input
          type="text"
          id="project-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="project-category">Category</label>
        <select
          id="project-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="data">Data</option>
        </select>
      </div>

      {formError && <p className="form-error">{formError}</p>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
