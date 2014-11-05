from interfaces import IFeedbackWidget
from z3c.form.widget import Widget, FieldWidget
from z3c.form.interfaces import IFieldWidget, IFormLayer
from z3c.form.browser import widget
from zope.component import adapter
from zope.interface import implementer, implementer_only
from zope.schema.interfaces import IField

@implementer_only(IFeedbackWidget)
class FeedbackWidget(widget.HTMLInputWidget, Widget):
    """Input type Int widget implementation."""

    klass = u'feedback-widget'
    css = u'feedback'
    value = 0
    max = 5

    def update(self):
        super(FeedbackWidget, self).update()
        if self.field.max:
            self.max = self.field.max
        widget.addFieldClass(self)
        
    def stars(self):
        stars = []
        for star in range(self.max):
            on = u''
            try:
                value=int(self.value)
            except:
                value = 0
            if value >= star+1:
                on = u'iomedia-widgets-feedback-star-on'
            stars.append({'on':on})
        return stars

@adapter(IField, IFormLayer)
@implementer(IFieldWidget)
def FeedbackFieldWidget(field, request):
    """IFeedbackWidget factory for FeedbackWidget."""
    return FieldWidget(field, FeedbackWidget(request))
