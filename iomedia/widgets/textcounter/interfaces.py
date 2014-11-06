from z3c.form.interfaces import IWidget

class ITextcounterWidget(IWidget):
    """ A textarea widget with character counter. Uses max_length to provide 
       'x characters remaining' countdown. ]
    """