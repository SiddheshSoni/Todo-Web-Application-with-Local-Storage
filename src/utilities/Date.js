const currentDate = new Date();
const options ={ 
    month: "long", 
    day: "numeric",
    year: "numeric"
}
const formattedDate = currentDate.toLocaleString("en-US", options);

export default formattedDate;