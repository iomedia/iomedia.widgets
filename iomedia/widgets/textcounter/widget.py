from interfaces import ITextcounterWidget
from z3c.form.widget import Widget, FieldWidget
from z3c.form.interfaces import IFieldWidget, IFormLayer
from z3c.form.browser import widget
from zope.component import adapter
from zope.interface import implementer, implementer_only
from zope.schema.interfaces import IField

@implementer_only(ITextcounterWidget)
class TextcounterWidget(widget.HTMLTextAreaWidget, Widget):
    """Input type Int widget implementation."""

    klass = u'iomedia-widgets-textcounter'
    css = u'textcounter'
    value = u''
    maxlength=None
    style=u'white-space: pre-wrap;'

    def update(self):
        super(TextcounterWidget, self).update()
        if self.field.max_length:
            self.maxlength = self.field.max_length
        widget.addFieldClass(self)

@adapter(IField, IFormLayer)
@implementer(ITextcounterWidget)
def TextcounterFieldWidget(field, request):
    """ITextcounterWidget factory for TextcounterWidget."""
    return FieldWidget(field, TextcounterWidget(request))
