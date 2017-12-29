module.exports = {
  lang: 'en',
  errors: {
    VALIDATION_FAILED: 'Please correct any errors and try again.',
    OBJECT_PERSIST_FAILED: 'Something went wrong, please try again later.',

    FIELD_REQUIRED: 'This field is required.',
    FIELD_MAXLENGTH: 'Cannot be longer than {x} characters.',
    FIELD_MINLENGTH: 'Cannot be shorter than {x} characters.',
    FIELD_REGEX_MATCH: 'Invalid input format provided.',
    FIELD_EMAIL: 'Must be a valid email.',

    MISSING_BODY: 'Some required fields are missing or empty.',
    USER_NOT_FOUND: 'Invalid username or password.',
    AUTHENTICATION_FAILED: 'Invalid username or password.',
    ROLE_VALIDATION_FAILED: 'You don\'t have access to assign this role.',

    ROLE_ESCALATION_FAILED: 'You don\'t have permission to add users of this role level.',
    CLOUD_USER_ALTER_NOT_ALLOWED: 'You can\'t alter this cloud user.',
    USER_CANNOT_REMOVE_SELF: 'You cannot delete yourself.',

    INVALID_SERVICE_OR_ACTION_ATTEMPT: 'Invalid action attempt on service.', 
    INVALID_IP_AS_LISTENER_REQUEST: 'Unable to bind httpProxy/openVPN server to this listener.',
    INVALID_HTTP_MODE_REQUEST: 'Invalid HTTP mode change requested.',
    STORED_CONFIG_WAS_NULL: 'Unable to store service configuration.'
  }
}
