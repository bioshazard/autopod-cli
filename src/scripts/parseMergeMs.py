import os
import webvtt

def addTime(ogTime, plusTime):
    # Break down time string
    hours, minutes, seconds, ms = map(int, ogTime.replace('.', ":").split(":"))
    addSeconds, addMs = map(int, plusTime.split("."))

    # Add up time parts
    seconds += addSeconds
    ms += addMs

    # Overflow right to left
    if ms >= 1000:
        seconds += ms // 1000
        ms = ms % 1000

    if seconds >= 60:
        minutes += seconds // 60
        seconds = seconds % 60

    if minutes >= 60:
        hours += minutes // 60
        minutes = minutes % 60

    formatted_time = f"{hours:02d}:{minutes:02d}:{seconds:02d}.{ms:03d}"
    return formatted_time

timeOffset = os.getenv('VTT_OFFSET', None)
vttFile = os.getenv('VTT_FILE')
vttActor = os.getenv('VTT_ACTOR')

for caption in webvtt.read(vttFile):
    startTime = caption.start

    if timeOffset:
        startTime = addTime(startTime, timeOffset)

    print(startTime, f"{vttActor}:", caption.text)
