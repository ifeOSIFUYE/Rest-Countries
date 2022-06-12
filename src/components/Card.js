import {
  AspectRatio,
  Box,
  Divider,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

const Card = ({ country, handleClick }) => {
  return (
    <GridItem
      as="article"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      onClick={handleClick}
      cursor="pointer"
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={country.flag} alt={country.name} objectFit="cover" />
      </AspectRatio>
      <Divider />
      <Box p="6" pb="10" textAlign="left">
        <Heading as="h3" fontSize="md" mb="2">
          {country.name}
        </Heading>
        <Text>
          Population:{' '}
          <Box as="span" color="gray.600">
            {country.population.toLocaleString()}
          </Box>
        </Text>
        <Text>
          Region:{' '}
          <Box as="span" color="gray.600">
            {country.region}
          </Box>
        </Text>
        <Text>
          Capital:{' '}
          <Box as="span" color="gray.600">
            {country.capital ? country.capital : 'nil'}
          </Box>
        </Text>
      </Box>
    </GridItem>
  );
};

export default Card;
