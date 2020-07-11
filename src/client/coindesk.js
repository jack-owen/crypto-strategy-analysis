function getHistoricalBPI(dateStart, dateEnd, buyFrequency, setHistoricalBPI) {
  //+ validate dateStart and dateEnd and buyFrequency values before fetch.
  fetch(
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
      dateStart +
      "&end=" +
      dateEnd
  )
    .then((res) => res.json())
    .then(
      (result) => {
        setHistoricalBPI({
          isLoaded: true,
          bpi_usd: frequencySelection(result.bpi, buyFrequency),
        });
      },
      (error) => {
        setHistoricalBPI({
          isLoaded: true,
          error,
          bpi_usd: [],
          validationError: true,
        });
        console.log("Failed to fetch coindesk bpi");
      }
    );
}

// select bpi records that match the desired frequency from the returned json set (e.g. daily, weekly, monthly)
function frequencySelection(data, buyFrequency) {
  let result = [];
  if (buyFrequency === buyFrequencyOptions.monthly) {
    // select first of the month dates only
    for (const key in data) {
      const day = key[8] + key[9];
      if (day === "01") {
        const value = data[key];
        result.push({
          date: key,
          bpi: value,
        });
      }
    }
  } else if (buyFrequency === buyFrequencyOptions.weekly) {
    // select the following days in each month -> 1, 8, 15, 22, 29
    //* a more advanced method would be to select all dates that fall on a Monday
    for (const key in data) {
      const day = key[8] + key[9];
      if (["01", "08", "15", "22", "29"].includes(day)) {
        const value = data[key];
        result.push({
          date: key,
          bpi: value,
        });
      }
    }
  } else {
    for (const key in data) {
      const value = data[key];
      result.push({
        date: key,
        bpi: value,
      });
    }
  }
  return result;
}

const buyFrequencyOptions = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};

export default getHistoricalBPI;
