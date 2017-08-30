import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { addNotification } from '../../actions/notificationActions'

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';


// import EditEmployeeForm from './forms/EditEmployeeForm.jsx';



const styleSheet = theme => ({
	appBar: {
		position: 'relative',
	},
	formSession: {
		justifyContent: 'center',
		padding: theme.spacing.unit * 2,
	},
	flex: {
		flex: 1,
	}
});

class NoticeboardEdit extends React.Component {
	static dataFetcher({ params, urlBase }) {
		return fetch(`${urlBase || ''}/api/notice/${params.id}`).then(response => {
			if (!response.ok) return response.json().then(error => Promise.reject(error));
			return response.json().then(data => ({ NoticeboardEdit: data }));
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			notice: {
				title: '', name: '',
			},
			invalidFields: {},
			showingValidation: false,
			toastMessage: '',
			toastType: 'success',
			open: true,
			isFetching: false
		};

		this.onChange = this.onChange.bind(this);
		this.onValidityChange = this.onValidityChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.submitForm = this.submitForm.bind(this);

		this.dismissValidation = this.dismissValidation.bind(this);
		this.showValidation = this.showValidation.bind(this);

		this.hideModal = this.hideModal.bind(this);
	}
	componentDidMount() {
		this.loadData();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.loadData();
		}
	}
	onValidityChange(event, valid) {
		// Properties in the target object will be overwritten by properties in the sources if they have the same key.  
		const invalidFields = Object.assign({}, this.state.invalidFields);
		if (!valid) {
			invalidFields[event.target.name] = true;
		} else {
			delete invalidFields[event.target.name];
		}
		this.setState({ invalidFields });
	}
	onChange(event, convertedValue) {
		const notice = Object.assign({}, this.state.notice);

		const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
		notice[event.target.name] = value;
		this.setState({ notice });
	}
	showValidation() {
		this.setState({ showingValidation: true });
	}
	dismissValidation() {
		this.setState({ showingValidation: false });
	}


	formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	loadData() {
		this.setState({ isFetching: true });
		NoticeboardEdit.dataFetcher({ params: this.props.match.params })
			.then(data => {
				const notice = data.NoticeboardEdit;
				notice.createdAt = new Date(notice.createdAt);
				notice.completionDate = notice.completionDate != null ? this.formatDate(notice.completionDate) : null;
				console.log('notice.completionDate', notice.completionDate);

				this.setState({ notice });
				this.setState({ isFetching: false });
			}).catch(err => {
				this.props.dispatch(addNotification(`Error in fetching data from server: ${err.message}`, 'success'));
			});
	}
	hideModal() {
		this.setState({ open: false });
		this.props.history.push('/notices')
	};
	onSubmit(values) {
		console.log('values', values);
		const notice = Object.assign({}, values);
		if (values.completionDate) {
			const completionDate = new Date(values.completionDate);
			notice.completionDate = completionDate;
		}
		console.log('notice', notice);


		fetch(`/api/notice/${this.props.match.params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(notice),
		}).then(response => {
			if (response.ok) {
				response.json().then(updatedEmployee => {
					// convert to MongoDB Date object type
					updatedEmployee.createdAt = new Date(updatedEmployee.createdAt);

					this.setState({ notice: updatedEmployee });
					// this.props.showSuccess('Updated notice successfully.');
					this.props.dispatch(addNotification('Updated notice successfully', 'success'));
				});
			} else {
				response.json().then(error => {
					this.props.dispatch(addNotification(`Failed to update notice: ${error.message}`, 'error'));
				});
			}
		}).catch(err => {
			this.props.dispatch(addNotification(`Failed to update notice: ${err.message}`, 'success'));
		});
	}
	submitForm() {
		this.props.dispatch(submit('EditEmployeeForm'));
	}
	render() {
		const notice = this.state.notice;
		let validationMessage = null;
		if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
			validationMessage = (
				<Alert bsStyle="danger" onDismiss={this.dismissValidation}>
					Please correct invalid fields before submitting.
				</Alert>
			);
		}

		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen
					open={this.state.open}
					onRequestClose={this.hideModal}
					transition={<Slide direction="up" />}>

					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton color="contrast" onClick={this.hideModal} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography type="title" color="inherit" className={classes.flex}>
								Edit Employee
							</Typography>
							<Button color="contrast" onClick={this.submitForm}>
								save
              </Button>
						</Toolbar>
					</AppBar>
					<div className={classes.formSession}>
						{/* <EditEmployeeForm notice={notice} initialValues={notice} onSubmit={this.onSubmit} /> */}
					</div>
				</Dialog>
			</div>
		);
	}
}
NoticeboardEdit.propTypes = {
	match: PropTypes.object.isRequired
};

const componentWithStyles = withStyles(styleSheet)(NoticeboardEdit);
export default connect()(componentWithStyles);
