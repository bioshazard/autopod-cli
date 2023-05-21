import os, webvtt

def addTime(ogTime, plusTime):

  # Break down time string
  hours, minutes, seconds, ms = map(int, ogTime.replace('.',":").split(":"))
  addHours, addMinutes, addSeconds, addMs = map(int, plusTime.replace('.',":").split(":"))

  # Add up time parts
  hours += addHours
  minutes += addMinutes
  seconds += addSeconds
  ms += addMs

  # Overflow right to left
  if ms >= 1000:
    seconds += 1
    ms -= 1000

  if seconds >= 60:
    minutes += 1
    seconds -= 60

  if minutes >= 60:
    hours += 1
    minutes -= 60
  
  formatted_time = f"{hours:02d}:{minutes:02d}:{seconds:02d}.{ms:03d}"

  return formatted_time

timeOffset = os.getenv('VTT_OFFSET', None)
vttFile = os.getenv('VTT_FILE')
vttActor = os.getenv('VTT_ACTOR')

for caption in webvtt.read(vttFile):
  # print(caption.start)
  # print(caption.end)
  # print(caption.text)

  startTime = caption.start

  if timeOffset:
    startTime = addTime(startTime, timeOffset)

  print(startTime, f"{vttActor}:", caption.text)

