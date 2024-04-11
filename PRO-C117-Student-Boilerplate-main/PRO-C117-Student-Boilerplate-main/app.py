# import the necessary modules
from flask import Flask , render_template , request , jsonify

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page

@app.route('/')
def home():
   return render_template('index.html')

# write a route for post request
@app.route('/predict' , methods = ['POST'])
def review():

    response = ""
    review = request.json.get('customer_review')
    
    if not review:
        
        response = jsonify({'status':'Error',
                            'message':'Empty Review'})

    else: 
        
        sentiment , emoji_url = sa.predict(review)
        response = jsonify({'status':'Sucess',
                            'prediction': sentiment,
                            'url':emoji_url})

if __name__  ==  "__main__":
    app.run(debug = True)
    