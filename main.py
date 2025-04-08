f = input("Enter File Name(Without Extention): ")
with open(f"M3U8/{f}.m3u8", "w") as file:
    file.write(f"#EXTM3U{"\n"}")
while True:
    Title = input("Enter Title(Write Done if done.): ")
    if Title.lower() != "done":
        Link = input("Enter Link: ")
        with open(f"M3U8/{f}.m3u8", "a") as file:
            file.write(f"#EXTINF:-1, {Title}{"\n"}")
            file.write(f"{Link}{"\n"}")
    else:
        break
