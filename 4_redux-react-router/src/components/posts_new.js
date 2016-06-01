import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => { //after promise
        this.context.router.push('/')//look at my old router pushes and compare (hash history)
      })
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props//comes from reduxForm

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values.title)
    errors.title = 'Enter a title'
  if(!values.categories)
    errors.categories = 'Enter categories'
  if(!values.content)
    errors.content = 'Enter content'
  return errors
}

//args: form config, mapStateToProps, mapDispatchToProps
export default reduxForm({ // does react redux connect for you
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew)
