function getHistoricalBPI(dateStart, dateEnd, buyFrequency, setHistoricalBPI) {
  //   function validate(data) {
  //     if (data.toString().length === 1) return "0" + data;
  //     return data;
  //   }

  // select desired frequency of bitcoin records from daily json records (daily, weekly, monthly)
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

  fetch(
    // "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
    //   date.startYear +
    //   "-" +
    //   validate(date.startMonth) +
    //   "-" +
    //   validate(date.startDay) +
    //   "&end=" +
    //   date.endYear +
    //   "-" +
    //   validate(date.endMonth) +
    //   "-" +
    //   validate(date.endDay)
    "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-05-01"
  )
    .then((res) => res.json())
    .then(
      (result) => {
        // this.setState({
        //   isLoaded: true,
        //   historic_bpi_usd: frequencySelection(
        //     result.bpi,
        //     this.state.buyFrequency
        //   ), //overwrite array
        // });
        setHistoricalBPI({
          isLoaded: true,
          bpi_usd: frequencySelection(
            result.bpi,
            // this.state.buyFrequency
            buyFrequency
          ),
          //   historic_bpi_usd: "jacko",
        });
      },
      (error) => {
        // this.setState({
        //   isLoaded: true,
        //   error,
        //   historic_bpi_usd: [],
        //   validationError: true,
        // });
        setHistoricalBPI({
          isLoaded: true,
          error,
          bpi_usd: [],
          validationError: true,
        });
        console.log("ERROR replace me!");
      }
    );
}

const buyFrequencyOptions = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};

export default getHistoricalBPI;
