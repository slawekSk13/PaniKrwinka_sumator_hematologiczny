export const sum = (a, b) => a + b;

export const changeLocation = (newLocation = "") => {
  window.location.href = `/#/${newLocation}`;
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const checkMatch = (el, regEx) => {
  if (
    el.patName.match(regEx) ||
    el.patOwnerName.match(regEx) ||
    el.patOwnerLname.match(regEx)
  ) {
    return el;
  }
};

const findMatchingPatients = (arrayToFilter, regEx) => {
  return arrayToFilter.filter((el) => checkMatch(el, regEx));
};

const findMatchingResults = (historicalResults, matchingPatients) => {
  if (historicalResults) {
    let matchingResults = [];
    matchingPatients.forEach((matchingPatient) => {
      const resultsToAdd = historicalResults.filter(
        (historicalResult) => historicalResult.patientId === matchingPatient.id
      );
      const resulultsWithPatient = resultsToAdd.map((result) => ({
        ...result,
        patient: { ...matchingPatient },
      }));
      matchingResults = [...matchingResults, ...resulultsWithPatient];
    });
    return matchingResults;
  }
};

export const showHistoricalResults = (
  historicalPatients,
  regEx,
  historicalResults
) => {
  const matchingPatients = findMatchingPatients(historicalPatients, regEx);
  return findMatchingResults(historicalResults, matchingPatients);
};

export const handleAddCellWBC = (prevState, value, progress) => {
  const corrWbc =
    prevState.leukogram.nrbc < 5
      ? value
      : progress < 100
      ? "b.d."
      : ((value * 100) / (100 + prevState.leukogram.nrbc)).toFixed(2);

  return {
    ...prevState,
    leukogram: {
      ...prevState.leukogram,
      wbc: {
        nominal: value,
        corrected: corrWbc,
      },
    },
  };
};

export const handleAddCellNRBC = (prevState) => ({
  ...prevState,
  leukogram: {
    ...prevState.leukogram,
    nrbc: prevState.leukogram.nrbc + 1,
  },
});

export const handleAddCellLeuko = (prevState, key) => ({
  ...prevState,
  leukogram: {
    ...prevState.leukogram,
    relative: {
      ...prevState.leukogram.relative,
      [key]: prevState.leukogram.relative[key] + 1,
    },
  },
});
