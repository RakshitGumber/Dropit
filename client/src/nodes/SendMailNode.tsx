import { useState } from "react";
import { NodeTemplate } from "../components/Node";
import { Button } from "@/components/ui/button";
import { useNodesData, useHandleConnections } from "@xyflow/react";
import toast from "react-hot-toast";
import showdown from "showdown";

const mailBody = {
  receiver: "",
  subject: "",
  body: "",
};

type MailBodyKey = keyof typeof mailBody; // Ensures keys match mailBody

export const SendMailNode = ({ id }: { id: string }) => {
  const [mailData, _] = useState(mailBody);

  const mailConnection = useHandleConnections({
    type: "target",
    id: `${id}-input`,
  });

  const bodyConnection = useHandleConnections({
    type: "target",
    id: `${id}-input-text`,
  });

  const mailDataConnection = useNodesData(mailConnection?.[0]?.source);
  const bodyDataConnection = useNodesData(bodyConnection?.[0]?.source);

  const handleButtonClick = async () => {
    await toast.promise(postMail(), {
      loading: "Generating summary...",
      success: "Summary generated successfully",
      error: "Error generating summary",
    });
  };

  const postMail = async () => {
    try {
      const variablesData = mailDataConnection?.data.value as {
        key: MailBodyKey;
        value: string;
      }[]; // Proper type definition
      variablesData.forEach((item) => {
        mailData[item.key] = item.value; // Now `item.key` is properly typed
      });
      console.log(mailData);
      console.log(bodyDataConnection);
      if (bodyDataConnection?.data.value) {
        if (bodyDataConnection?.type === "text") {
          mailData.body = bodyDataConnection?.data.value as string;
        }
      } else if (
        bodyDataConnection?.type === "gemini" ||
        bodyDataConnection?.type === "summarize"
      ) {
        mailData.body = bodyDataConnection?.data?.summary as string;
        const converter = new showdown.Converter();
        mailData.body = converter.makeHtml(mailData.body);
      }
      if (
        mailData.receiver !== "" &&
        mailData.subject !== "" &&
        mailData.body !== ""
      ) {
        console.log("all data received");
        const response = await fetch(
          "https://dropit-er31.onrender.com/pipelines/send-mail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `pipeline=${JSON.stringify(mailData)}`,
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <NodeTemplate
      title="Send Mail"
      target={[{ id: `${id}-input` }, { id: `${id}-input-text` }]}
      content={<SendMailComponent handleButtonClick={handleButtonClick} />}
    />
  );
};

const SendMailComponent = ({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={handleButtonClick}
        variant="outline"
        size="icon"
        className="w-[100px] h-[100px] rounded-xl flex items-center justify-center"
      >
        <span>Mail</span>
      </Button>
    </div>
  );
};
