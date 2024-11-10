---
slug: "markdown-crashcourse"
date: "2024-11-07"
title: "A Crash Course into Markdown"
description: "A basic primer into markdown that will get you rolling."
categories: ["crashcourse","dsl"]
featured: false
---

In this article, we explore a fascinating Python script that showcases a unique approach to payload encoding and
decoding. This script is designed to encode Python scripts as a sequence of files, each containing small parts of the
payload, and later decode them to reconstruct the original script. This process can be valuable in various cybersecurity
applications, such as obfuscation techniques or distributed systems where payloads need to be delivered securely.

The script features a set of classes that handle the encoding and decoding process, including a payload generator, file
encoder, file decoder, and an execution handler. We'll break down the functionality and the key concepts in the code to
better understand how it works and how you can leverage it in your own projects.

# Key Concepts and Workflow
## Imports
```python
import glob
import os
import platform
import random
import re
import sys
from os import walk
from typing import List, Tuple
```

## Payload Class
The Payload class takes a string and applies a random "rotation" to each character, encoding the original content into a
seemingly random sequence. This rotation is then reversed during decoding to retrieve the original payload. The process
involves encoding and decoding each character based on a random rotation sequence.

```python
class File:
    def __init__(self, ascii_char: str, rotation: str, string_index: str):
        self.ascii_char = ascii_char
        self.string_index = string_index
        self.rotation = rotation


class Payload:
    def __init__(self, raw_content: str) -> None:
        self.raw_content: str = raw_content
        random.seed("1")
        self.rotation_sequence = [random.randint(0, len(raw_content)) for _ in range(len(raw_content))]
        # print(self.raw_content)
        # print(self.rotation_sequence)

        coded_content = ""
        for idx in range(len(self.rotation_sequence)):
            raw_content_char = bytes(self.raw_content[idx].encode('utf-16'))
            print(raw_content_char)
            rotation_sequence_int = self.rotation_sequence[idx]
            if raw_content_char not in ['\r', '\n']:
                coded_content += chr(ord(raw_content_char) + rotation_sequence_int)
        print(coded_content)
        decoded_conent = ""
        for idx in range(len(self.rotation_sequence)):
            enc_content_char = coded_content[idx]
            print(enc_content_char)
            rotation_sequence_int = self.rotation_sequence[idx]
            if coded_content[idx] not in ['\r', '\n']:
                decoded_conent += chr(ord(enc_content_char) - rotation_sequence_int)
        print(decoded_conent)
        sys.exit(0)
```

## File Encoder
The FileEncoder class converts the encoded payload into individual files, where each file represents a portion of the
payload, encrypted with a specific rotation value. These files are named based on a combination of ASCII values and the
rotation applied to them. This approach allows us to split the payload into pieces, which can then be distributed or
stored separately.

```python
class FileEncoder:
    write_files: List[File] = []

    def write(self, python_script: str) -> None:
        for idx, char in enumerate(python_script):
            idx = str(idx).rjust(4, "0")
            rotation = random.randint(0, 25)
            self.write_files.append(File(ascii_char=str(ord(char)), rotation=str(rotation), string_index=f"{idx}"))
        for file in self.write_files:
            with open(f"dist/{int(file.ascii_char) + int(file.rotation)}.{file.string_index}", mode="wb+") as f:
                rot = str("SHIFT" + str(file.rotation))
                f.write(bytes(str(rot).encode("utf-8")))
```

## File Decoder

The FileDecoder class reads the encoded files, sorts them by their indices, and reconstructs the original payload by
reversing the rotations applied during encoding. This is an example of file-based encoding, where the payload is split
and stored in separate files, only to be reassembled when needed.

```python
class FileDecoder:
    read_files: List[Tuple[int, int]] = []  # List[Tuple[ascii_character, str_index]]

    def decode(self) -> str:
        files = sorted(self.read_files, key=lambda file: file[1][1:])
        rendered_string = ""
        for file in files:
            with open(f"./dist/{file[0]}.{file[1]}", mode="r") as f:
                rotation = f.read()
            rendered_string += chr(int(file[0]) - int(rotation[5:]))
        return rendered_string

    def read(self) -> None:
        for (dirpath, dirnames, filenames) in walk("./dist"):
            for filename in filenames:
                self.read_files.append(tuple(filename.split(".")))
```

## Executor Class

The Executor class ties everything together. It checks whether the script is running on a supported operating system (
Windows in this case), encodes the payload using the FileEncoder, and then decodes and executes it. The payload itself
is a Python script that, when decoded, prints a specific flag to the console.

```python
class Executor:
    def __init__(self):
        self.check_os_is_supported()
        self.payload = """import subprocess\r\nprocess = subprocess.Popen(('python -c "import this"'), shell=True, stdout=subprocess.PIPE)\r\nprint('The flag is: '+ process.stdout.read()[4:7].decode('utf-8'))"""
        self.encoder = FileEncoder()
        self.decoder = FileDecoder()

    @staticmethod
    def check_os_is_supported() -> None:
        if not bool(re.match("windows", str(platform.platform()).lower())):
            sys.exit("This application only supports Windows OS")

    def encode(self):
        self.cleanup()
        payload = Payload(self.payload)
        self.encoder.write(payload.raw_content)

    def decode(self):
        self.decoder.read()
        deciperhed_string = self.decoder.decode()
        exec(deciperhed_string)

    @staticmethod
    def cleanup() -> None:
        files = glob.glob("./dist/*")
        for f in files:
            os.remove(f)

if __name__ == "__main__":
    executor = Executor()
    executor.encode()
    executor.decode()
```

# How the Code Works

## The Payload Generation

The payload itself is a Python script that prints out a portion of the Zen of Python (import this). The payload is first
encoded using a random rotation method that alters each character based on a random number. This makes the payload
harder to read or understand without decoding.

## Encoding the Payload

The FileEncoder class writes each encoded character into separate files, using a combination of the character's ASCII
value and the random rotation applied to it. These files are saved in a dist directory. Each file represents a fragment
of the encoded payload.

## Decoding the Payload

The FileDecoder class reads all the fragmented files, sorts them by their indices, and reconstructs the original payload
by reversing the rotations. The reconstructed payload is then executed using Python’s exec function.

## Execution

The Executor class ensures that the entire process—encoding, file creation, decoding, and execution—runs smoothly. It
first encodes the payload and writes it to disk, then decodes the files and executes the payload.

# Potential Use Cases

## Obfuscation

This technique can be used to obfuscate Python scripts, making it harder to analyze or reverse-engineer the payload.

## Distributed Systems

In scenarios where a payload needs to be split across multiple systems or devices, this method of encoding the payload
into separate pieces can help facilitate secure distribution.

## Secure Execution:

If you need to execute a script in a secure environment where the script's contents should not be exposed in plain text,
this encoding and decoding mechanism can help maintain confidentiality.

# Conclusion

This Python script provides a creative and technical approach to encoding and decoding payloads by leveraging file-based
encoding, random rotation, and the ability to execute the final payload after decoding. It's a great example of how
encoding can be used for security, obfuscation, and payload delivery. Understanding and implementing such methods can
provide valuable insights for developing more robust and secure applications.

Feel free to explore and modify the code to fit your own use cases or to further experiment with encoding techniques in
your cybersecurity tools and applications.