import moment from "moment";

export const formatDate = (dateString?: string) => {
    // Check if dateString is provided
    if (!dateString) {
      return 'Date not available'; // Return a default message if no date is provided
    }
  
    const date = moment(dateString);
  
    // Check if the date is valid
    if (!date.isValid()) {
      return 'Invalid date'; // Return a message if the date is invalid
    }
  
    return date.format('MM-DD-YYYY');
  };