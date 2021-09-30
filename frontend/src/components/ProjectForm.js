import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', repLink: '', workers: [props.users[0].id]}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleChangeSelect(event) {
        this.setState(
            {
                [event.target.name]: Array.prototype.slice.call(
                    document.querySelectorAll(`#${event.target.id} option:checked`), 0).map(
                    function (v, i, a) {
                        return v.value;
                    })
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repLink, this.state.workers)
        // console.log(this.state.workers)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="repLink">Link</label>

                    <input type="text" className="form-control" name="repLink" value={this.state.repLink}
                           onChange={(event) => this.handleChange(event)}/>


                </div>
                <div className="form-group">
                    <label htmlFor="workers">workers</label>

                    <select id="worker-select" name="workers" className='form-control' multiple={'multiple'}
                            onChange={(event) => this.handleChangeSelect(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </div>
            </form>
        );
    }
}

export default ProjectForm
