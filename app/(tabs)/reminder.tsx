import { Card, ScrollView, Text, YStack, Button, XStack } from "tamagui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDeleteRemainder, useUser } from "../../hooks/useUser";
import FaIcon from "@expo/vector-icons/FontAwesome";
import { RefreshControl } from "react-native";

export default function Reminder() {
  const { data, isSuccess, refetch, isFetching } = useUser();
  const notif = useDeleteRemainder();

  function handleDelete(id: string) {
    notif.mutate(id);
  }

  return (
    <ScrollView
      padding={20}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      {/* <Button
        onPress={()=>refetch()}
        color="$primary"
        marginBottom="$4"
        borderRadius={12}
        size="large"
      >
        Refresh
      </Button> */}
      {isSuccess ? (
        data.data?.notifications && data.data?.notifications.length > 0 ? (
          <YStack gap={16} paddingBottom={100}>
            {data.data.notifications.map((item) => (
              <Card
                key={item.id}
                padding="$4"
                marginBottom="$4"
                backgroundColor="$background"
                borderRadius={16}
                shadowColor="$shadow"
                shadowRadius={12}
                borderWidth={1}
                borderColor="$gray300"
                hoverStyle={{
                  backgroundColor: "$primary10", // Highlight card on hover
                }}
              >
                <XStack alignItems="center" justifyContent="space-between">
                  <YStack gap={8} flex={1}>
                    <XStack alignItems="center" space="m">
                      <MaterialCommunityIcons
                        name="water"
                        size={28}
                        color="#00A9E0"
                      />
                      <YStack>
                        <Text
                          fontSize={18}
                          fontWeight="600"
                          color="$primary"
                          numberOfLines={1}
                          ellipsizeMode="tail" // Ellipsis for long text
                        >
                          {item.title}
                        </Text>
                        <Text fontSize={14} color="$secondary" numberOfLines={2}>
                          {item.content}
                        </Text>
                        <Text fontSize={12} color="$gray500">
                          {new Date(item.created_at).toLocaleString()}
                        </Text>
                      </YStack>
                    </XStack>
                  </YStack>
                  <Button
                    icon={<FaIcon name="trash" color="red" />}
                    onPress={() => handleDelete(String(item.id))}
                    variant="outlined"
                    size="small"
                    color="red"
                    borderRadius={8} // Rounded button
                    paddingHorizontal={10}
                  >
                    Delete
                  </Button>
                </XStack>
              </Card>
            ))}
          </YStack>
        ) : (
          <YStack alignItems="center" paddingVertical={100}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={64}
              color="$gray500"
            />
            <Text fontSize={18} color="$gray500" textAlign="center" marginTop={12}>
              No reminders available.{"\n"}Pull down to refresh
            </Text>
          </YStack>
        )
      ) : null}
    </ScrollView>
  );
}
