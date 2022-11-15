export function protocolMessage(topic, command, optional) {
    console.log(topic, command, optional)
    command = {
        topic: topic,
        command: command,
        arguments: optional
    }

    return JSON.stringify(command)
}