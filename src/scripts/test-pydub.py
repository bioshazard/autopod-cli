from pydub import AudioSegment
from pydub.playback import play

# Load the MP3 file
audio_file = AudioSegment.from_file("bios.mp3", format="mp3")

# Set the start and end time for the segment to extract
start_time = 5000  # 5 seconds (in milliseconds)
end_time = 10000  # 10 seconds (in milliseconds)
end_time2 = 20000  # 10 seconds (in milliseconds)

# Extract the desired segment
segment = audio_file[start_time:end_time2]

# Play the extracted segment
play(segment)
