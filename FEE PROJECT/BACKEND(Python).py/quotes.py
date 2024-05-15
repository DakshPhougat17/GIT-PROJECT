import random

quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "In three words I can sum up everything I've learned about life: it goes on. – Robert Frost",
    # Add more quotes as needed
]

def get_random_quote():
    return random.choice(quotes)

if __name__ == "__main__":
    print(get_random_quote())