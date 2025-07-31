import axios from 'axios';


const apiClient = axios.create({
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Astronaut {
  name: string;
  craft: string;
}

export interface PeopleInSpace {
  number: number;
  people: Astronaut[];
}

export const fetchISSPosition = async (): Promise<ISSPosition> => {
  try {
    const response = await apiClient.get('http://api.open-notify.org/iss-now.json');
    if (response.data?.iss_position) {
      return {
        latitude: parseFloat(response.data.iss_position.latitude),
        longitude: parseFloat(response.data.iss_position.longitude),
        timestamp: response.data.timestamp || Math.floor(Date.now() / 1000),
      };
    }
    throw new Error('Invalid response format from ISS API');
  } catch (error) {
    console.error('Error fetching ISS position:', error);
    // Return a default position as fallback
    return {
      latitude: 0,
      longitude: 0,
      timestamp: Math.floor(Date.now() / 1000),
    };
  }
};

export const fetchPeopleInSpace = async (): Promise<PeopleInSpace> => {
  try {
    const response = await apiClient.get('http://api.open-notify.org/astros.json');
    if (response.data?.people) {
      return {
        number: response.data.number || 0,
        people: response.data.people || [],
      };
    }
    throw new Error('Invalid response format from Astronauts API');
  } catch (error) {
    console.error('Error fetching people in space:', error);
    // Return empty data as fallback
    return {
      number: 0,
      people: [],
    };
  }
};

export const getISSOnlyCrew = (data: PeopleInSpace): Astronaut[] => {
  if (!data?.people) return [];
  return data.people.filter(astronaut => astronaut.craft === 'ISS');
};
