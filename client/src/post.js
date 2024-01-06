
import {format, formatISO9075} from 'date-fns'
import {Link} from 'react-router-dom'
export default function Post({_id,title,summary,file,content,createdAt,author})
{
    return (
        <div className="post">
        <Link to={`/post/${_id}`}>
        <div className="img">
          <img src={'http://localhost:4000/'+file}></img>
        </div>
        </Link>
          
          <div className="text">
          <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
          <p className="info">
            <a href="">{author.username}</a>
            <time>{format(new Date(createdAt),'MMM d, yyyy hh:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
          </div>  
        </div>
    );
}