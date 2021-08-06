import React, { useState } from "react";
import {
  Box,
  Tab,
  TabPanel,
  Tabs,
  TabList,
  TabPanels,
  Text,
  Flex,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineWeibo, AiOutlineWechat, AiOutlineQq } from "react-icons/ai";
import SignIn from './SignIn'
import SignUp from './SignUp'

function App() {
  // 0 登录 1 注册
  const [type, setType] = useState(0);

  const AuthWeChat = () => {
    window.location.href = 'https://www.jianshu.com/users/auth/wechat'
  }

  const AuthQq = () => {
    window.location.href = 'https://www.jianshu.com/users/auth/qq_connect'
  }

  return (
    <Box w="100vw" h="100vh" textAlign="center" bgColor="gray.100">
      <Box w="480px" h="100vh" mx="auto">
        <Box
          p={6}
          bgColor="white"
          mx="auto"
          borderRadius="lg"
          boxShadow="lg"
          transform="translateY(10vh)"
        >
          <Tabs isFitted variant="line" colorScheme="red">
            <TabList mx="auto" w="60%">
              <Tab _focus={{ boxShadow: "none" }} onClick={() => setType(0)}>
                登录
              </Tab>
              <Tab _focus={{ boxShadow: "none" }} onClick={() => setType(1)}>
                注册
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
            <Flex mx="auto" w="80%" alignItems="center" color="gray.400">
              <Box flex="1">
                <Divider />
              </Box>
              <Box flex="1">
                <Text fontSize="12px">
                  社交账号{type === 0 ? "登录" : "直接注册"}
                </Text>
              </Box>
              <Box flex="1">
                <Divider />
              </Box>
            </Flex>
            <HStack py={4} mx="auto" justify="center" spacing={8}>
              {type === 0 ? (
                <Box>
                  <AiOutlineWeibo color="#e05244" size="30" />
                </Box>
              ) : (
                ""
              )}
              <Box>
                <AiOutlineWechat onClick={AuthWeChat} color="#00bb29" size="30" />
              </Box>
              <Box>
                <AiOutlineQq onClick={AuthQq} color="#498ad5" size="30" />
              </Box>
            </HStack>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
