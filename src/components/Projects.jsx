import { useState, useEffect } from 'react';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const { projects, loading, error } = useProjects();

  // Every hook sits above the early returns below
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce: only apply the search 500ms after the last keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  // Derived on every render, not stored in state
  const query = debouncedTerm.trim().toLowerCase();
  const filteredProjects = projects
    .filter(project => filter === 'all' || project.category === filter)
    .filter(project =>
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      (project.description || '').toLowerCase().includes(query)
    );

  const categories = ['all', 'web', 'mobile', 'data'];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        <ProjectForm />

        {/* Filter buttons */}
        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="project-search">
          <label htmlFor="project-search" className="visually-hidden">Search projects</label>
          <input
            type="search"
            id="project-search"
            placeholder="Search projects by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="no-projects">No projects found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
