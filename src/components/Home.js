import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  const fetchCountriesData = async () => {
    const res = await axios.get('https://restcountries.com/v2/all');
    setCountries(res.data);
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const displayRegionMenuItems = () => {
    const regions = [...new Set(countries.map((country) => country.region))];
    return regions.map((region) => (
      <MenuItem key={region} onClick={() => handleRegion(region)}>
        {region}
      </MenuItem>
    ));
  };

  const displayCountries = () => {
    if (
      countries.filter((country) => country.name.toLowerCase().includes(query))
    ) {
      return countries
        .filter((country) => country.name.toLowerCase().includes(query))
        .map((country) => (
          <Card
            country={country}
            key={country.name}
            handleClick={() => {
              navigate(`${country.name}`);
            }}
          />
        ));
    }
  };

  const handleRegion = (region) => {
    setCountries(
      countries.filter(
        (item) => item.region.toLowerCase() === region.toLowerCase()
      )
    );
    setFilter(region);
    onToggle();
  };

  const clearFilters = () => {
    fetchCountriesData();
    onToggle();
  };

  return (
    <Box as="main">
      <Container maxW="container.xl" py={10}>
        <Flex mb={7} direction={['column', 'column', 'row']}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="search"
              onChange={(e) => setQuery(e.target.value)}
              variant="flushed"
              placeholder="Search for a country..."
              width="md"
              boxShadow="lg"
            />
          </InputGroup>
          <Menu>
            <MenuButton as={Button} pr={10} boxShadow="lg" size="lg">
              <Text as="small" fontSize="xs" mr={7}>
                Filter by Region
              </Text>{' '}
              <ChevronDownIcon />
            </MenuButton>
            <MenuList>{displayRegionMenuItems()}</MenuList>
          </Menu>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Button
            variant="ghost"
            leftIcon={<CloseIcon />}
            onClick={clearFilters}
            mb={5}
          >
            {filter}
          </Button>
        </Collapse>
        <Box maxW={['260px', 'container.xl']} m="0 auto">
          <SimpleGrid as="section" minChildWidth="260px" gap={14}>
            {displayCountries()}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
