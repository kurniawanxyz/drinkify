import { Heading, Text, View } from "tamagui";
import { useUser } from "../../hooks/useUser";
import { Button } from "../elements";

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://api.expo.dev/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


export default function WelcomeSection() {

  const {isSuccess, data, isError, error} = useUser()
  console.log(data?.data)
  if(isSuccess)
  {
    return (
      <View
        width={"100%"}
        borderRadius={"$5"}
        padding={10}
      >
        <Text fontSize={20} >Welcome back {data.data?.name}</Text>

      </View>
    )
  }

  if(isError)
  {
    return (
      <View
        width={"100%"}
        height={"$13"}
        backgroundColor={"$blue10Light"}
        borderRadius={"$5"}
      >
        <Heading>{error.name}</Heading>
      </View>
    )
  }
}
