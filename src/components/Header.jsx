import { Box, IconButton, useColorMode, Icon } from '@chakra-ui/react';
import React from 'react';
import { LuMoon, LuSun } from "react-icons/lu";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display={'flex'} justifyContent={'end'} alignItems={'center'} w={'100%'} h={'80px'} p={4}>
      <IconButton borderRadius={'100%'} onClick={toggleColorMode} variant="outline">
        {colorMode === 'light' ? (
          <Icon as={LuMoon} boxSize={5} />
        ) : (
          <Icon as={LuSun} boxSize={5} />
        )}
      </IconButton>
    </Box>
  );
}

export default Header;
