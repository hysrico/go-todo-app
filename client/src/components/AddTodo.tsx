import { useState } from "react";
import { useForm } from '@mantine/form';
import {} from '@mantine/hooks';
import { Group, Modal, Button, TextInput, Textarea } from '@mantine/core';
import React from "react";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: '',
            body: '',
        },
    });

async function createTodo(values: {title: string, body: string}) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
        method: 'POST',
        headers:{
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(values),
    }).then(r => r.json());

    mutate(updated);
    form.reset()
    setOpen(false);
}

    return (
        <> 
            <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
            <form onSubmit={form.onSubmit(createTodo)}>
                <TextInput
                    required mb={12}label="todo" placeholder="What today you want to do?"
                    {...form.getInputProps("title")}
                />
                <Textarea
                    required mb={12}label="body" placeholder="tell me more...?"
                    {...form.getInputProps("body")}
                />

                <Button type='button'>Create todo</Button>
            </form>
            </Modal>

            <Group position="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    ADD TODO
                </Button>
            </Group>
        </>
    );
}

export default AddTodo;