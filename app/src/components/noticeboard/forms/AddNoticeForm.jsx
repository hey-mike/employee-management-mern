import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';


const styleSheet = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    FormGroup: {
        margin: theme.spacing.unit,
    },
    BtnFormGroup: {
        margin: theme.spacing.unit,
        float: "right"
    },
    input: {
        margin: theme.spacing.unit,
    }
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
    let errMsg = "";
    if (error) errMsg = touched && error;

    return (
        <TextField
            label={label}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )
}


let AddNoticeForm = props => {
    const { handleSubmit } = props;
    const classes = props.classes;

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup className={classes.FormGroup} row={true}>
                <Field name="name" label="Name" component={renderTextField} className={classes.textField} fullWidth={true} type="text" />
            </FormGroup>
            <FormGroup className={classes.BtnFormGroup} row={true}>
                <Button onClick={props.handleCancel} color="primary">Cancel</Button>
                <Button type="submit" className={classes.button} color="primary" raised>Create</Button>
            </FormGroup>
        </form>
    )
}
const componentWithStyles = withStyles(styleSheet)(AddNoticeForm);
AddNoticeForm = reduxForm({
    // a unique name for the form
    form: 'AddNoticeForm'
})(componentWithStyles)

export default AddNoticeForm;
