import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { useStore } from "@/store/Provider";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Image = ({ id, src, status, likes = 0 }) => {
  const [like, setLike] = useState(likes);

  const { user } = useStore();

  const { axiosInstance } = useAxios();

  const handleLikes = async () => {
    if (!user) {
      return toast.error("Login first to like a meal");
    }

    try {
      setLike((prev) => prev + 1);
      const { data } = await axiosInstance({
        url: `meals`,
        method: "PATCH",
        data: { id },
      });

      if (!data.success) {
        throw new Error("Something went wrong while updating likes");
      }
    } catch (error) {
      toast.error(error.message);
      setLike(likes);
    }
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt=""
        className="max-h-[500px] w-full object-cover object-center rounded-2xl"
      />
      <div className="absolute top-2 left-2">
        <Badge className={"rounded-full bg-accent text-dark font-semibold"}>
          {status}
        </Badge>
      </div>
      <div className="absolute top-2 right-2">
        <Button
          onClick={handleLikes}
          size="sm"
          className="cursor-pointer bg-white/90 text-dark hover:bg-white/90"
        >
          <Heart className="text-gray-600" /> {like}
        </Button>
      </div>
    </div>
  );
};

export default Image;
