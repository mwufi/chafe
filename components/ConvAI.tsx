"use client"

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ConvAI() {
    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: ({ message, source }) => console.log('Message:', message, source),
        onError: (error) => console.error('Error:', error),
    });

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // Start the conversation with your agent
            await conversation.startSession({
                agentId: 'gwuuCMMpqhz7rnTBxSYM', // Replace with your agent ID
            });

        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    return (
        <div className={"flex justify-center items-center gap-x-4"}>
            <Card className={'rounded-3xl'}>
                <CardContent>
                    <CardHeader>
                        <CardTitle className={'text-center'}>
                            {conversation.status === 'connected' ? (
                                conversation.isSpeaking ? `Agent is speaking` : 'Agent is listening'
                            ) : (
                                'Disconnected'
                            )}
                        </CardTitle>
                    </CardHeader>
                    <div className={'flex flex-col gap-y-4 text-center'}>
                        <div className={cn('orb my-16 mx-12',
                            conversation.isSpeaking ? 'animate-orb' : (conversation.status === 'connected' && 'animate-orb-slow'),
                            conversation.status === 'connected' ? 'orb-active' : 'orb-inactive')}
                        ></div>

                        <Button
                            variant={'outline'}
                            className={'rounded-full'}
                            size={"lg"}
                            disabled={conversation.status === 'connected'}
                            onClick={startConversation}
                        >
                            Start conversation
                        </Button>
                        <Button
                            variant={'outline'}
                            className={'rounded-full'}
                            size={"lg"}
                            disabled={conversation.status !== 'connected'}
                            onClick={stopConversation}
                        >
                            Stop conversation
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}