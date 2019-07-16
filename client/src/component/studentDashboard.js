import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {getJobpost, getApplyjobStudent} from '../actions/postAction';

class StudentDashboard extends Component {
    componentDidMount(){
        this.props.getJobpost();
        this.props.getApplyjobStudent(this.props.auth.user.userId);
    }
    render() {
        const { user } = this.props.auth;
        const { jobs } = this.props.jobpost.jobs
        const {count} = this.props.applyjob.apply_student_job;
        return (
            
            <div className="ui grid">
                {
                    (((jobs == undefined || jobs.length==0 || jobs == null) && (count == undefined || count.length==0 || count == null))?
                    <div className="ui active loader"></div>:
                        <React.Fragment>
                            <div className="sixteen wide column">
                                <div className="ui stackable two column centered grid">
                                    {
                                        jobs.map(newjob=>(
                                            <div className="column" key={newjob._id}>
                                                <div className="ui segment">
                                                    <h3>{newjob.name}</h3>
                                                    <h5>{newjob.job_title}</h5>
                                                    <p>{newjob.description}</p>
                                                    <h6>Location: <span>{newjob.location}</span></h6>
                                                    <h6>Address: <span>{newjob.address}</span></h6>
                                                    <h6>Visit website: <span>{newjob.website}</span></h6>
                                                    <Link to={'/apply_job/'+newjob._id+'/'+newjob.company_id} className="ui small green button">Apply now</Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    jobpost: state.jobpost,
    applyjob: state.getapply_job
});

export default connect(mapStateToProps, {getJobpost, getApplyjobStudent})(StudentDashboard)