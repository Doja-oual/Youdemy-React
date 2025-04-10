import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative pb-[56.25%]">
        <img
          src={course.image_url || "https://via.placeholder.com/640x360?text=Cours"}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {course.category && (
          <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {course.category.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={course.mentor?.avatar_url || "https://via.placeholder.com/40?text=M"}
              alt={course.mentor?.name || "Mentor"}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{course.mentor?.name || "Mentor"}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-700">{course.rating || "4.5"}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-semibold">{course.price ? `${course.price} €` : "Gratuit"}</span>
          <Link to={`/courses/${course.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Voir le cours →
          </Link>
          <Link to={`/courses/${course.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
           supprime        
        </Link>
          <Link to={`/courses/${course.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            edit →
          </Link>
        </div>
      </div>

      {course.tags && course.tags.length > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-1">
          {course.tags.map((tag) => (
            <span key={tag.id} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseCard
