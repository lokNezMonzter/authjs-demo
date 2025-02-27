import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-16">
      <Card className="w-1/3">
        <CardHeader>
          <Image
            className="rounded-lg"
            src="https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="img"
            width={500}
            height={500}
            priority
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-2xl font-bold">
            Welcome, user!
          </CardTitle>
          <p className="text-muted-foreground">
            If you are learning something valuable from this video, please like
            and subscribe to my channel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
