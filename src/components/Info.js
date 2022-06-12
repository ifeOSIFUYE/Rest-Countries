import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Info = () => {
  const navigate = useNavigate();
  const params = useParams();
  const countryName = params.countryName;

  const [country, setCountry] = useState({});

  useEffect(() => {
    const fetchCountryData = async () => {
      const res = await axios.get(
        `https://restcountries.com/v2/name/${countryName}?fullText=true`
      );
      const arrayOfOneCountry = res.data;
      setCountry(
        arrayOfOneCountry.find(
          (item) => item.name.toLowerCase() === countryName.toLowerCase()
        )
      );
    };
    fetchCountryData();
  }, [countryName]);

  return (
    <Container maxW="container.xl">
      <Button
        leftIcon={<ArrowBackIcon />}
        boxShadow="md"
        onClick={() => navigate(-1)}
        mt={[7, 20]}
      >
        Back
      </Button>

      <SimpleGrid columns={[1, null, 2]} gap={10} mt={[10, 35]}>
        <GridItem>
          <AspectRatio ratio={16 / 9}>
            <Image src={country.flag} alt={country.name} objectFit="cover" />
          </AspectRatio>
        </GridItem>
        <GridItem>
          <Heading as="h2" mb={5}>
            {country.name}
          </Heading>
          <Flex direction={['column', 'row']} justify="space-between">
            <Box mb={10}>
              <Text>Native Name: {country.nativeName}</Text>
              <Text>
                Population: {new Intl.NumberFormat().format(country.population)}
              </Text>
              <Text>Region: {country.region}</Text>
              <Text>Sub Region: {country.subregion}</Text>
              <Text>Capital: {country.capital}</Text>
            </Box>
            <Box>
              <Text>Top Level Domain: {country.topLevelDomain}</Text>
              <Text>
                Currencies:{' '}
                {Array.isArray(country.currencies) &&
                  country.currencies
                    .map((currency) => currency.code)
                    .join(', ')}
              </Text>
              <Text>
                Languages:{' '}
                {Array.isArray(country.languages) &&
                  country.languages.map((language) => language.name).join(', ')}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default Info;
